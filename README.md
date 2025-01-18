
# Webhook Spammer

Allows the user to send messages from a text file to Discord via a webhook where every line is its own message.

Disclaimer: Only use this script in a way that complies to Discords ToS. This includes not spamming others webhooks you find online.


## Installation

Install [Bun](https://bun.sh) if you don't have it already

```bash
bun install package.json
```
    
## Usage

```bash
bun main.ts <path-to-document> <webhook-url> [custom-username] [custom-avatar]
```

## Examples
1. **Basic usage**
```bash
bun main.ts example.txt https://discord.com/api/webhooks/.../...
```

2. **Change the name of the webhook**
```bash
bun main.ts example.txt https://discord.com/api/webhooks/.../... "Karl Marx"
```

3. **Change the avatar of the webhook**
```bash
bun main.ts example.txt https://discord.com/api/webhooks/.../... "" https://example.org/image.jpg
```

