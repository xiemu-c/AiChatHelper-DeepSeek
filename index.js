const express = require('express');
const axios = require('axios');

//引用AI类
const DeepSeek = require('./classes/DeepSeek');

//需要对特定微信鉴权的，请在[]中填写对应微信ID
//类似：const WXID_ARRAY = ['wxid_abcdefg','lambous','yourxxx','abdcedf']
//[]内不添加微信ID则表示不进行鉴权
const WXID_ARRAY = [];

// 全局范围定义 supportedModels（支持的模型），格式：'模型名称':对应的AI类
const supportedModels = {
    'deepseek-r1': DeepSeek,
    'deepseek-v3': DeepSeek
};

const app = express();
const PORT = 3000; //端口可以按需修改

app.use(express.json());

// 获取AI官方响应
async function getResponse(url, method, headers, body) {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: headers,
            data: body
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching response: ${error}`);
    }
}

//把回应给WeChat Assistant信息格式化为微信助手可以识别的Json
function respondJsonMessage(message) {
    return {
        choices: [{
            message: {
                role: 'assistant',
                content: message,
            },
        }],
    };
}

app.use('/', async (req, res) => {
    try {
        //Only for WeChat Assistant
        const wxid = req.headers.wxid;
        if (!wxid) {
            throw new Error('您的请求不兼容于本服务');
        }
        //WeChat ID authorization
        if (WXID_ARRAY.length > 0 && !WXID_ARRAY.includes(wxid)) {
            return res.json(respondJsonMessage('当您看到这个信息，说明您需要联系本服务提供者进行使用授权'));
        }

        let requestAuthorization = req.headers.authorization;
        if (!requestAuthorization) {
            throw new Error('请提供API鉴权码');
        }

        const requestBody = req.body;
        let requestModel = requestBody.model.toLowerCase().trim();
        const requestMessages = requestBody.messages;
        const lastMessage = requestMessages[requestMessages.length - 1].content.trim();

        let response;
        const ModelClass = supportedModels[requestModel];

        if (ModelClass) {
            const modelInstance = new ModelClass(requestModel, requestAuthorization, requestMessages);
            response = await modelInstance.handleResponse(await getResponse(modelInstance.url, 'POST', modelInstance.headers, modelInstance.body));

            return res.json(respondJsonMessage(response));
        } else {
            return res.json(respondJsonMessage('不支持的 chat_model 类型'));
        }
    } catch (error) {
        console.error('Error:', error.toString()); // 记录错误信息
        return res.json(respondJsonMessage(`出错了: ${error.toString()}`));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
