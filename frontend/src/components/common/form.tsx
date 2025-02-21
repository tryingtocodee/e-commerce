import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"



interface FormControl {
    name: string;
    label: string;
    placeholder: string;
    componentType: string;
    type: string;
    options?: [{
        id: string;
        label: string
    }]
}

interface FormProps {
    formControl: FormControl[],
    buttonText: string,
    formData: any,
    onSubmit: any,
    setFormData: any
}


export default function CommonForm({ formControl  , buttonText, formData, setFormData, onSubmit }: FormProps) {

    const renderInputsByComponent = (getControlItem: FormControl) => {
        let element = null
        //@ts-ignore
        const value = formData[getControlItem.name]
        switch (getControlItem.componentType) {
            case 'input':
                element = (<input className="border border-black p-2 mb-2 rounded" name={getControlItem.name} placeholder={getControlItem.placeholder} type={getControlItem.type} 
                    value={value} onChange={(e)=>setFormData({...formData , [getControlItem.name] : e.target.value})}/>)
                break;
            case 'select':
                element = (
                    //shad cn gives a value property in <Select/>
                    <Select onValueChange={(value)=>setFormData({...formData , [getControlItem.name] : value})} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options && getControlItem.options.length > 0 ?
                                getControlItem.options.map((optionItem) => <SelectValue key={optionItem.id}>{optionItem.label}</SelectValue>) : null}
                        </SelectContent>
                    </Select>
                )
                break
            case 'textarea':
                element = (<Textarea name={getControlItem.name} placeholder={getControlItem.placeholder} value={value} onChange={e => ({...formData , [getControlItem.name] : e.target.value})}/>)
                break;
            default:
                element = (<input name={getControlItem.name} placeholder={getControlItem.placeholder} type={getControlItem.type} 
                    onChange={(e)=>setFormData({...formData , [getControlItem.name] : e.target.value})} />)
        }
        return element
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControl.map((controlItem: FormControl) => <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {
                            renderInputsByComponent(controlItem)
                        }
                    </div>)}
            </div>
            <Button className="mt-2" type="submit">{buttonText || "Submit"}</Button>
        </form>
    )
}