import { WebhookPayload } from './Types';

class DiscordMessage {
    constructor(private payload: WebhookPayload = { embeds: [] }) {}

    public setContent(content: string) {
        this.payload.content = content;

        return this;
    }

    public setColor(color: string | number) {
        if (typeIs(color, 'string')) {
            tonumber(color, 16);
        } else {
            let emb = this.payload.embeds
        }
    }
}

export default DiscordMessage;