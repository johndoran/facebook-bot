curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "message":{
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
              {
                "title":"Welcome to Phorest!",
                "item_url":"https://www.phorest.com",
                "image_url":"https://dl.dropboxusercontent.com/u/58413752/Phorest-acorn-icon.gif",
                "subtitle":"Thanks for stopping by, how can we help you today?",
                "buttons":[
                  {
                    "type":"web_url",
                    "title":"View Website",
                    "url":"https://www.petersbowlerhats.com"
                  },
                  {
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ]
}' "https://graph.facebook.com/v2.6/299573013461061/thread_settings?access_token=REPLACE"