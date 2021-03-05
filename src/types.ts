export interface WebhookPayload {
    username?: string;
    content?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: Embed[]
}

export interface Footer {
    text: string;
    icon_url?: string;
};

export interface Image {
    url: string;
    height?: number;
    width?: number;
}

export interface Thumbnail {
    url: string;
    height?: number;
    width?: number;
}

export interface Video {
    url: string;
    height?: number;
    width?: number;
}

export interface Author {
    name?: string;
    icon_url?: string;
    url?: string;
}

export interface Field {
    name: string;
    value: string;
    inline?: boolean;
}

export interface Embed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: Footer;
    image?: Image;
    thumbnail?: Thumbnail;
    video?: Video;
    author: Author;
    fields: Field[]
}