import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import useLocalStorage, { setStringValue } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { router } from "expo-router";

const prompts = [
    "My go-to song when I shower is...",
    "My go-to late-night drive anthem is...",
    "My favourite party song is...",
    "My go-to sad song anthem...",
    "My go-to song when I need a pick-me-up is...",
    "My go-to song when I'm feeling nostalgic is...",
    "My go-to song when I want to relax is...",
    "My go-to song when I'm on a road trip is...",
    "My go-to song when I need motivation for a workout is...",
    "My go-to song when I'm in a celebratory mood is...",
    "My go-to when I want to escape reality is...",
    "My go-to song when I'm feeling reflective is...",
    "My go-to song when I'm getting ready for a night out is...",
    "My go-to song when it's raining outside is...",
    "My go-to song when I'm working out at the gym is...",
    "My go-to song when I'm cooking dinner is...",
    "My go-to song when I'm driving with the windows down is...",
    "My go-to song when I'm studying is...",
    "My go-to song when I'm taking a long walk is...",
    "My go-to song when I'm cleaning the house is...",
    "My go-to song when I'm winding down before bed is...",
    "My go-to song when I'm feeling adventurous is...",
    "My go-to song when I'm commuting to work is...",
    "My go-to song when I'm feeling adventurous is...",
    "My go-to song when I'm commuting to work is...",
    "My go-to song when I'm feeling a bit down and need a boost is...",
    "My go-to song when I'm spending time outdoors is...",
    "My go-to song when I'm cooking a special meal is...",
    "My go-to song when I'm in a creative mood is...",
    "My go-to song when I'm missing someone is...",
    "My go-to song when I'm feeling nostalgic is...",
    "My go-to song when I'm on a road trip is...",
    "My go-to song when I'm celebrating a success is...",
    "My go-to song when I'm feeling laid-back and carefree is...",
    "My go-to song when I'm in a romantic mood is...",
    "My go-to song when I'm spending quality time with friends is...",
    "My go-to song when I'm feeling adventurous and spontaneous is...",
    "My go-to song when I'm enjoying a sunny day outdoors is...",
    "My go-to song when I'm in a reflective and introspective mood is...",
    "My go-to song when I'm expressing my creativity is...",

    ]

// Defines the datatype of the props 
type songPromptComponentProps={
    prompt:string,
    curr_iter:number,
    setChosenPrompt:React.Dispatch<React.SetStateAction<string>>,
}
const ThemeSongsPromptPages = () => {
    const [chosenPrompt, setChosenPrompt]:any = useLocalStorage('themeSongPrompt',"")
    const styles = StyleSheet.create({
        container:{
            padding:10
        }
    })
// End of definition of datatypes

    return (
        <ScrollView style={styles.container}>

            {prompts.map((prompt,index)=>(<SongPromptComponent
            prompt={prompt}
            curr_iter={index}
            key={index}
            setChosenPrompt={setChosenPrompt}
            />))}
            
        </ScrollView>
    )
}

const SongPromptComponent = (props:songPromptComponentProps) =>{
    const styles = StyleSheet.create({
        promptSize : {
            fontSize:15,
        },
        promptContainer:{
            marginVertical:10,
            padding:5,
            borderBottomWidth: (props.curr_iter + 1 == prompts.length ? 0: 1)
        }
    })
    function updatePrompt(){

    }
    return(
        <Pressable style={styles.promptContainer} onPress={()=>setStringValue('themeSongPrompt',props.prompt)
        .then(()=>{
            props.setChosenPrompt(props.prompt)
            router.back()
        })}>
            <Text style={styles.promptSize}>{props.prompt} </Text>
        </Pressable>
    )
}
export default ThemeSongsPromptPages;