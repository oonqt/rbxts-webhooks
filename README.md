# Webhooks ![Downloads Badge](https://img.shields.io/npm/dm/@rbxts/webhooks) ![Github Issues Badge](https://img.shields.io/github/issues/oonqt/rbxts-webhooks) ![NPM Version](https://img.shields.io/npm/v/@rbxts/webhooks)
A small package containing a layer of abstraction around Discord webhooks

Example:
```ts
import { Webhook } from '@rbxts/webhooks';

// First parameter is the webhook URL, the second parameter
// Second parameter specifies whether or not you want to automatically resend the request if it gets ratelimited. The request is automatically rescheduled to be send according to the retry_after property sent back by Discord.

(async () => {
    const webhook = new Webhook('https://discord.com/api/webhooks/807274115975118918/9Dh9svbtXdT3yUGZH1dBS6m9ez3aRcWVS0-H_KFWq51emW0ET_LrL3M3R8l-KMXvq8nw', true);
    
    try {
        await webhook.send({
            username: 'Hello',
            avatar_url: 'https://i.imgur.com/47hzofe',
            content: 'This is a plain webhook message',
            embeds: [
                {
                    title: 'My Embed Title',
                    description: 'My Embed Description',
                    url: 'https://github.com/oonqt/rbxts-webhooks',
                    image: {
                        url: 'https://www.roblox.com/bust-thumbnail/image?userId=345234&width=420&height=420&format=png',
                        height: 256,
                        width: 256
                    },
                    thumbnail: {
                        url: 'https://www.roblox.com/bust-thumbnail/image?userId=38486&width=420&height=420&format=png',
                        height: 256,
                        width: 256
                    },
                    timestamp: DateTime.now().ToIsoDate(), // Must be a valid ISO8601 timestamp.
                    color: 0xdb020d,
                    author: {
                        name: 'A Roblox Player',
                        url: 'https://www.roblox.com',
                        icon_url: 'https://www.roblox.com/bust-thumbnail/image?userId=48&width=420&height=420&format=png'
                    },
                    footer: {
                        text: 'Hello!',
                        icon_url: 'https://www.roblox.com/bust-thumbnail/image?userId=345234&width=420&height=420&format=png'
                    },
                    fields: [
                        {
                            name: 'Some field',
                            value: 'Yes'
                        },
                        {
                            name: 'Some inline field',
                            value: 'Yes',
                            inline: true
                        }
                    ]
                }
            ]
        });

        print('Successfully sent webhook!');
    } catch (err) {
        warn(`Failed to execute webhook: ${err}`);
    }
})
```