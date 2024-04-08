import { View,Text, ScrollView, Button, StyleSheet,Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { storeObjectData } from "../../hooks/useLocalStorage";

// This section of the code defines the props datatype.
type CheckListProp = {
    label:string,
    checkList: string[],
    savedSelected: boolean,
    setCheckList: React.Dispatch<React.SetStateAction<string[]>>,
}

// End of props datatype

const EthnicityComponent = () => {


    const ethnicities:string[] = [
        "Asian",
        "Black/African American",
        "East Asian",
        "Hispanic/Latino",
        "Middle Eastern",
        "Native American",
        "Pacific Islander",
        "South Asian",
        "South East Asian",
        "Other",
        "Prefer not to say"
    ]

    const styles = StyleSheet.create({
        container:{
            maxHeight:580
        },
        button_container: {
            marginTop:20,
            alignItems:"center",
        },
        button_style:{
            width:150,
        }
    });

    const updateEthnicityList = () => {
            /*
                This section of code updates the data from the device's local storage at key 'ethnicity'. It also upates the 
                current choices made by the user.
            */
        storeObjectData('ethnicity',checkList).then(
            setEthnicity(checkList)
        )
    }

    const [ethnicity,setEthnicity]:any = useLocalStorage('ethnicity',[] as string[]);
    const [checkList, setCheckList]= useState([] as string[]);
    
    return (
        <View>
            <ScrollView style={styles.container}>
                {ethnicities.map((ethnicity_item,index)=>
                    
                        <CheckList label={ethnicity_item} key={index}
                        savedSelected={ethnicity.includes(ethnicity_item)?true:false}
                        checkList={checkList} setCheckList={setCheckList}
                        />
                    )}
            </ScrollView>

            <View style={styles.button_container}>
                <Pressable style={styles.button_style}>
                    <Button title="Done" onPress={() => updateEthnicityList()}/>
                </Pressable>
            </View>
        </View>

    )

}

const CheckList = (props: CheckListProp) => {
    // This state determines if the ethnicity is currently selected by the user in order to update the check list
    const [toggle,setToggle] = useState(props.savedSelected);

    const styles = StyleSheet.create({
        container :{
            borderBottomWidth:1,
            padding:5,
            margin:5,
            flexDirection:"row",
            alignItems:"center",
            maxHeight:650
        },
        text_style: {
            fontSize:15,
            flex:1
        }
    })


    function updateList(){
        /*
            This function is responsible for managing the state of the current selected ethnicities by the user.
            The data modified from this function will only besaved if and only if the user presses the 'done' button
        */
        if (!toggle)
            {
                let copy:string[]= []
                props.checkList.map((value)=>copy.push(value));

                copy.push(props.label);

                props.setCheckList(copy);
                setToggle(!toggle)

            } else
                {
                    let copy = props.checkList.slice();
                    copy = copy.filter((label=>label !== props.label))
                    props.setCheckList(copy);
                    setToggle(!toggle)

                } 

            }

    // This line of code is to ensured that the proper data is stored on the state that manages the active checklist is correct
    useEffect(()=>{
        setToggle(props.savedSelected)
        if(props.savedSelected){
            props.checkList.push(props.label)
            props.setCheckList(props.checkList)
        }
        },[props.savedSelected])

    return(
        <View style ={styles.container}>
            <Text style={styles.text_style}>{props.label}</Text>
            <Checkbox value={toggle} onValueChange={updateList} />
        </View>
    )

    
}

export default EthnicityComponent;