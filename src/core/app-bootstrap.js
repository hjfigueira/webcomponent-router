import {ce} from "../assets/helpers.js";
import ConversationSingle from "../pages/conversationSingle.js"
import ConversationList from "../pages/conversationList.js"
import ConversationSingleNoSub from "../pages/conversationSingleNoSub.js";

let mainRouter = ce('app-router');
mainRouter.id = 'mainRouter';
mainRouter.states = {
    '/' : ConversationList,
    '/conversation/.*' : ConversationSingle,
    '/conversation-nosub' : ConversationSingleNoSub,
};

document.body.append(mainRouter);