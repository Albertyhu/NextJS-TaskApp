
type PanelProps = {
    children: React.ReactNode, 
} 
const Panel = ({ children }: PanelProps) : React.ReactElement => {
    return (
        <div
            id="panel"
            className = "w-11/12 h-fit bg-white rounded-lg py-10 mx-auto my-10 md:w-8/12 lg:w-6/12 box_shadow"
        >
            <div
                id="content_wrapper"
                className = "w-11/12 mx-auto"
            >
                {children}
            </div>
        </div>
    )
}

export default Panel; 