import Panel from '@/components/panel'; 
import Image from 'next/image'
import TaskAPP from '@/_assets/images/TASK-APP-dark.png'; 

const Page = (): React.ReactElement => {
    return (
        <Panel>
            <div
                className = "w-11/12 mx-auto"
            >
                <div
                    className = "mx-auto my-10 w-full object-fit" 
                >
                    <Image
                        src={TaskAPP}
                        alt="task app logo"
                        priority={true}
                        />
                </div>
                <h1 className = "font-bold mx-auto text-2xl text-center">About Task App</h1>
                <p>This app was created with Next JS and Tailwind CSS. It uses Mongo DB as a database to store users and the tasks.</p>
                <p>Created by <a
                        href="https://www.ladesigninitiative.com/" target="_blank"
                        className = "font-bold underline"
                    >Albert Hu</a>
                </p>
            </div>
        </Panel>
    )
}

export default Page; 