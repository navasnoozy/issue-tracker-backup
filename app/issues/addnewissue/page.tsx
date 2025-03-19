import { Button, TextArea, TextField } from "@radix-ui/themes";


const Newpage = ()=>{
    return (
        <div className="max-w-md space-y-5 shadow-lg p-6">
           <TextField.Root placeholder="Title" />
           <TextArea placeholder="Description" />
           <Button type='submit'>Create Issue</Button>
        </div>
    )
};

export default Newpage