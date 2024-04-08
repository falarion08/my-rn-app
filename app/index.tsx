import { View,Text,TextInput,StyleSheet, ScrollView, Button} from "react-native";
import { FormInformation } from "../utils/details";
import { Link, useFocusEffect } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";

// Defines the data type for each props
type UserDetailFormProps = {
    form_details: FormInformation,

}

// End of datatype definition of props

const HomePage = () =>{

    const [school,setSchool] = useState("")
    const [profession,setProfession] = useState("")
    const [ethnicity,setEthnicity]:any[] = useLocalStorage('ethnicity',[]);
    const [interests,setInterests]:any[] = useLocalStorage('interests',[]);
    const [prompt,setUserPrompt]:any[] = useLocalStorage('themeSongPrompt',"");
    const [themeSong,setThemeSong] = useState("")


    // Manages the current data to be rendered in the homepage
    let userDetailForm:FormInformation[] = [
        {
            title: "UNIVERSITY/COLLEGE",
            placeholder_text:"Choose University or College",
            clickable:true,
            value:school,
            setValue:setSchool,
            
    
        },{
            title:"CURRENT PROFESSION",
            placeholder_text:"Enter current profession",
            clickable:true,
            value:profession,
            setValue:setProfession,
        },{
            title:"ETHNICITY",
            placeholder_text:"Select what ethnicity fits you",
            clickable:true,
            url:"ethnicity",
            value:ethnicity,
            setValue:setEthnicity,
        },{
            title:"INTERESTS",
            placeholder_text:"Select your interests",
            clickable:false,
            url:"interests",
            value:interests,
            setValue:setInterests,
        },{
            title:"MY THEME SONG WHEN...",
            placeholder_text:"Choose a prompt that works best for you",
            clickable:true,
            url:"songs_prompt",
            value:(prompt.length >= 45 ? prompt.slice(0,45) + '...' : prompt),
            setValue:setUserPrompt,
        },{
            title:"THEME SONG",
            placeholder_text:"Choose your theme song",
            clickable:true,
            url:"theme_song",
            value:themeSong,
            setValue:setThemeSong,
        },

    ]


    return (
        
        <ScrollView>
            {userDetailForm.map((data,index)=>
            (<UserDetailComponent form_details={data} key={index}
            />)
            )}

        </ScrollView>
    )
}

const UserDetailComponent = (props:UserDetailFormProps) => {
    const styles = StyleSheet.create({
        form_container:{
            margin:10,
            padding:2,
            borderBottomWidth:0.5,
            flexDirection:"row"
        },
        bold:{
            fontWeight:"bold"
        },
        flex_1:{
            flex:1
        }
    })
    return (

        <View style={styles.form_container}>

            <View style={styles.flex_1}>
                <Text style={styles.bold}>{props.form_details.title}</Text>
                <TextInput
                placeholder={props.form_details.placeholder_text}
                multiline={true}
                value={String(props.form_details.value)}
                onChangeText={props.form_details.setValue}
                />
            </View>
        
            {props.form_details.url !== undefined && 
            <Link href={{
                pathname:props.form_details.url,
            }}>
                <Ionicons name="caret-forward-outline"  size={32} />
            </Link>}
        </View>
    )


}

export default HomePage;

