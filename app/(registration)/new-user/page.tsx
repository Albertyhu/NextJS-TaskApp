import RedirectWrapper from './redirect'; 

const Page = (): React.ReactElement => {
    
    return (
        <RedirectWrapper>
            <div
                className="mt-[50px] text-white text-2xl mx-auto"
            
            >
                <p>Your account has successfully been created. </p>
                <p>You will be redirected to the home page.</p>
            </div>
        </RedirectWrapper >
    )
}

export default Page; 