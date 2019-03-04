import MenuTemplate from "../pages/menuTemplate.js";
import ConversationList from "../pages/conversationList.js";
import ConversationSingle from "../pages/conversationSingle.js";

// app
//     .router( '/' ,{
//         views : { default: MenuTemplate() }
//     })
//
//     .router( '/conversations', {
//         views : { mainPage: ConversationList() }
//     })
//
//     .router( '/conversations/item/:id', {
//         views: { mainPage: ConversationSingle() }
//     });

export default {

    '/' : {
        views: MenuTemplate,
        states : {

            'conversations': {
                views: {
                    mainPage: ConversationList
                }
            },

            'conversation\/([0-9])': {
                views: {
                    mainPage: ConversationSingle
                }
            },

            'really\/complex\/conversation\/([0-9])': {
                views: {
                    mainPage: ConversationSingle
                }
            }
        }
    },
};