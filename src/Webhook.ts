const RunService = game.GetService('RunService');
const HttpService = game.GetService('HttpService');
import { delay as fastDelay } from '@rbxts/delay-spawn-wait';
import { WebhookPayload } from './Types';
import DiscordMessage from './DiscordMessage';

class Webhook {
    public payload: WebhookPayload;

    constructor(public url: string, public rateLimitRetry: boolean = true) {
        assert(!RunService.IsServer(), 'Webhooks can only be created & executed on the server due to HttpService rules');
        
        this.payload = {};
    }

    public setUsername(username: string) {
        this.payload.username = username;
    }

    public setAvatar(avatarURL: string) {
        this.payload.avatar_url = avatarURL;
    }

    public execute(payload: string | WebhookPayload | DiscordMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            let formattedPayload: WebhookPayload = {
                ...this.payload
            }
    
            if (typeIs(payload, 'string')) {    
                formattedPayload.content = payload;
            } else {
                formattedPayload = { ...formattedPayload, ...payload }
            }
    
            try {
                const response = HttpService.RequestAsync({
                    Url: this.url,
                    Method: 'POST',
                    Headers: {
                        'Content-Type': 'application/json'
                    },
                    Body: HttpService.JSONEncode(formattedPayload)
                });
    
                if (response.StatusCode === 429 && this.rateLimitRetry) {
                    const parsedBody = HttpService.JSONDecode<{ retry_after: number; }>(response.Body);

                    fastDelay(parsedBody.retry_after, () => this.execute(payload));
                } else if (response.Success) {
                    reject(`Error executing webhook. Status: ${response.StatusCode}, body: ${response.Body}`);
                } else {
                    resolve();
                }
            } catch (err) {
                reject(`Error executing webhook: ${err}`);
            }
        })
    }
}

export default Webhook;