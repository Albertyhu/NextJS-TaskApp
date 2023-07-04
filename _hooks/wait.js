export function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve,  time)
    })
}

//cosnt About = lazy(()=>wait(1000).then(()=>import("./...")))