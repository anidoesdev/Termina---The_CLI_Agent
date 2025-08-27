import express from "express"
import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(express.json())

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});



app.post('/api/generate',async(req,res)=>{
    try {
        const { prompt } = req.body; 
        if(!prompt){
            return res.status(400).json({error:'Prompt is required'})
        }
        const fullPrompt = `You are an expert in shell commands, Kubernetes (kubectl), and git.
                    Your sole purpose is to receive a natural language query and return only the precise, single-line command to accomplish it.
                    Do not provide any explanation, preamble, or any text other than the command itself.
                    If the command is dangerous, like a recursive delete, add a "DANGEROUS:" prefix to your response.

                    User Query: "${prompt}"
                    Command:`
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: fullPrompt,
        });
        const command = response.output_text;
        res.json({Command:command})
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to generate command'})
    }
    
    
})
app.listen(3000)


