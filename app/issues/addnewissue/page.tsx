'use client'
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const Newpage = ()=>{
    return (
        <div className="max-w-md space-y-5 shadow-2xl p-6 rounded-md">
           <TextField.Root placeholder="Title" />
           <SimpleMDE placeholder="Description" />
           <Button type='submit'>Create Issue</Button>
        </div>
    )
};

export default Newpage