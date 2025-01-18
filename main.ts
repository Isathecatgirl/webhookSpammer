import { BunFile } from "bun"

// Validate messages to send
const documentPath: string = Bun.argv[2]
if (!documentPath) { 
    throw new Error("Missing argument file")
}

const document: BunFile = Bun.file(documentPath)
if (!await document.exists()) {
    throw new Error("Path is not a file")
}

const content: string = await document.text()
let messages: Array<string> = content.split('\n').filter(message => message.replaceAll(' ', '') != '')
messages = messages.map(message => message.replaceAll('\\n', '\n'))

if (!messages.length) {
    throw new Error("Text file can't be empty")
}

const errorIndex: number = messages.findIndex(message => message.length > 2000)
if (errorIndex > -1) {
    throw new Error("Message in line " + (errorIndex + 1) + " is longer than 2000 characters")
}

// Validate webhook
const webhookURL: string = Bun.argv[3]
if (!webhookURL) {
    throw new Error("Missing argument webhook")
}

await fetch(webhookURL).then(r => {
    if (!r.ok) {
        throw new Error("Could not connect to webhook")
    }
})

// Check for name and avatar arguments
let name: string|null = Bun.argv[4]
let avatar: string|null = Bun.argv[5]

if (name.replaceAll(" ", "") == "") {
    name = null
}

if (avatar) {
    try {
        new URL(avatar)
    } catch (e) {
        avatar = null
    }
}


// Send messsages
async function sendMessage(message: string, index: number): Promise<boolean> {
    console.log(index)
    const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            content: message,
            username: name,
            avatar_url: null
        }),
    })
      
    return response.ok
}

for (let index:number = 0; index < messages.length; index++)  {
    await new Promise<void>((resolve) => {
        setTimeout(async () => {
            const success: boolean = await sendMessage(messages[index], index)
            if (!success) index--
            resolve()
        }, 100)
    })
}