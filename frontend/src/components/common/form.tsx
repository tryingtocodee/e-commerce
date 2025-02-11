
interface FormControl {
    name:string;
    label:string;
    placeholder : string;
    componentType: string;
    type : string;
}

interface FormProps{
    formControl : FormControl[]
}

const renderInputsByComponent = (getControlItem) =>{
    let element = null

    switch (getControlItem.componentType){
        case 'input':
            element = (<input name={getControlItem.name} placeholder={getControlItem.placeholder} type={getControlItem.type}/>)
            break;
        default:
            element =( <input name={getControlItem.name} placeholder={getControlItem.placeholder}/> )
    }
    return element
}

export default function CommonForm({formControl} : FormProps){
    return (
        <form>
            <div className="flex flex-col gap-3">
                {
                formControl.map((controlItem : FormControl) => <div className="grid w-full gap-1.5" key={controlItem.name}>
                    {
                        renderInputsByComponent(controlItem)
                    }
                </div>)     
                }
            </div>
        </form>
    )
}