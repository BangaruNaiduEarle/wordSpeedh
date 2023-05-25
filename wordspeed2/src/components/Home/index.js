import {useState,useEffect} from "react"

const Home = () => {
    const [source,setSource] = useState("Bigrams")
    const [generator,setGenerator] = useState({combinations: 2,repititions:3})
    const [threshold, setThershold] = useState({wpm: 40, accuracy: 100})
    const [userInput, setUserInput] = useState("")
    const [randomText, setRadomText] = useState("")
    const [totalEntry, setTotalEntry] = useState(0)
    const [userOUt, setUserOut] = useState({userWpm : 0, userAccuracy : 0})
    const [time, setTime] = useState()
    const [count, setCount] = useState(0)
    const keys = ["a","s","d","f","j","k","l",";"]
    const getTheRandomText = () => {
        let newRandomText = ""
        const {combinations, repititions} = generator
        if (source === "Bigrams"){
            let bigram = []
            for (let i=0; i < combinations; i++) {
                let randomKeys = ""
                for(let j=0; j<2; j++) {
                    const randomKey = keys[Math.ceil(Math.random()*7)]
                    randomKeys += randomKey
                }
                bigram.push(randomKeys)
            }
            const combo = bigram.join(" ") + " "
            newRandomText = combo.repeat(repititions).trim()
        }
        else if (source === "Trigrams") {
            let trigram = []
            for (let i=0; i < combinations; i++) {
                let randomKeys = ""
                for(let j=0; j<3; j++) {
                    const randomKey = keys[Math.ceil(Math.random()*7)]
                    randomKeys += randomKey
                }
                trigram.push(randomKeys)
            }
            const combo = trigram.join(" ") + " "
            return newRandomText = combo.repeat(repititions).trim()
        }
        else if (source === "Tetragrams") {
            let tetra = []
            for (let i=0; i < combinations; i++) {
                let randomKeys = ""
                for(let j=0; j<4; j++) {
                    const randomKey = keys[Math.ceil(Math.random()*7)]
                    randomKeys += randomKey
                }
                tetra.push(randomKeys)
            }
            const combo = tetra.join(" ") + " "
            newRandomText = combo.repeat(repititions).trim()
        }
        return newRandomText
    }
    useEffect(() => {
        setRadomText(getTheRandomText())
       
    },[generator,threshold,source])

    useEffect(() => {
        const index = userInput.length
        const part = randomText.slice(0,index)
        if(userInput.length < 2 && userInput.length > 0 && count === 0) {
            setTime(new Date())
            setCount(1)
        }
        setTotalEntry(prev => prev+1)
        if(userInput.length === randomText.length) {
            if(userInput === randomText) {
                const TotalTime = new Date() - new Date(time)
                const outwpm = (totalEntry/5)*60/(TotalTime/1000)
            }
        }
    },[userInput])

    console.log(source)
    const bigrams = source === "Bigrams" ? true : false
    const trigrams = source === "Trigrams" ? true : false
    const tetragrams = source === "Tetragrams" ? true : false
    const onchanceUserInput = (e) => {
        setUserInput(e.target.value)
        
    }
    return (
        <div>
            <div>
                <div>
                    <h1>Source</h1>
                    <div>
                        <input type="radio" id="Bigrams" name="source" value="Bigrams" onChange={(e) => setSource(e.target.value)} checked={bigrams}  />
                        <label htmlFor="Bigrams">Bigrams</label>
                    </div>

                    <div>
                        <input type="radio" id="Trigrams" name="source" value="Trigrams" onChange={(e) => setSource(e.target.value)} checked={trigrams} />
                        <label htmlFor="Trigrams">Trigrams</label>
                    </div>

                    <div>
                        <input type="radio" id="Tetragrams" name="source" value="Tetragrams" onChange={(e) => setSource(e.target.value)} checked={tetragrams} />
                        <label htmlFor="Tetragrams">Tetragrams</label>
                    </div>
                </div>
                <div>
                    <h1>Generator</h1>
                    <div>
                        <label htmlFor="combination">Combnations</label>
                        <input type="number" id="combination" value={generator.combinations} onChange={(e) => setGenerator(prev => ({...prev,combinations: e.target.value}))} />
                    </div>
                    <div>
                        <label htmlFor="repetition">Repetitions</label>
                        <input type="number" id="repetition" value={generator.repititions} onChange={(e) => setGenerator(prev => ({...prev,repititions: e.target.value}))} />
                    </div>
                </div>
                <div>
                    <h1>Threshold</h1>
                    <div>
                        <label htmlFor="wpm">WPM</label>
                        <input type="number" id="wpm" value={threshold.wpm} onChange={(e) => setGenerator(prev => ({...prev,wpm: e.target.value}))} />
                    </div>
                    <div>
                        <label htmlFor="accuracy">Accuracy</label>
                        <input type="number" id="accuracy" value={threshold.accuracy} onChange={(e) => setGenerator(prev => ({...prev,accuracy: e.target.value}))} />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1>{randomText}</h1>
                </div>
                <input type="text" value={userInput} onChange={onchanceUserInput} />
            </div>
        </div>
    )
}

export default Home