import { useEffect, useState } from "react";
import { View,Text,StyleSheet, ScrollView, Pressable,Animated} from "react-native";
import useLocalStorage from "../../hooks/useLocalStorage";
import { storeObjectData } from "../../hooks/useLocalStorage";
import { router } from "expo-router";

// This section of code is for defining the datatypes of each props. It defines what values are expected to be sent to the 
// child component
type CategoryComponentProps = {
    category:string,
    choices:string[],
    addBorder:boolean,
    interests:string[],
    setValue:React.Dispatch<React.SetStateAction<string[]>>,
    interestCount:number,
    setInterestCount:React.Dispatch<React.SetStateAction<number>>


}

type ButtonProps = {
    title?:string,
    isSelected?:boolean,
    interests:string[],
    setValue:React.Dispatch<React.SetStateAction<string[]>>,
    interestCount:number,
    alwaysInteractable?:boolean
    setInterestCount:React.Dispatch<React.SetStateAction<number>>
}

// -- End of Props Datatype

const choicesPerCategory = {
    'Sports': ['Baseball','Basketball','Cricket','Cycling','Extreme Sports',
    'Football','Golf','Hockey','Martial Arts','Rugby','Running','Skiing',
    'Snowboarding','Soccer','Surfing','Swimming','Tennis','Volleyball',
    ],
    'Activities':['Biking','Board Game','Camping','Concerts','DIY Crafts','Gaming',
        'Meditation','Painting','Photography','Reading','Travelling',
        'Volunteering','Writing','Yoga'
    ],
    'Music':['Classical','Country','EDM','Folk','Hip Hop','Jazz','Pop','R&B',
        'Rap','Reggae','Rock'
    ],
    'Film':['Action','Adventure','Animation','Comedy','Drama','Fantasy','Horror',
        'Musical','Myster','Romance','Sci-Fi','Suspense','Thriller',
    ],
    'Hobbies':['Collecting','Birdwatching','Drawing','Fishing','Gardening',
        'Hiking','Instruments','Knitting','Reading',
    ]
}
const categories:string[] = ['Sports','Activities','Music','Film','Hobbies']


const InterestsPage = () => {

    const styles = StyleSheet.create({

        container:{
            backgroundColor:"white",
        
        },
        headingTitle:{
            fontWeight:"bold",
            fontSize:20,
            textAlign:"center"
        },
        m_y:{
            paddingVertical:20
        },
        currentInterestsContainer:{
            flexDirection:"row",
            justifyContent:"space-around",
            flexWrap:"wrap",
            gap:10
        },
        marginTop:{
            marginTop:20,
        }
    });

    const [interests,setInterests]:any = useLocalStorage('interests',[] as string[]);
    const [interestsCount, setInterestsCount] = useState(interests.length);
    
    function renderCurrentSelected(){
        
        let currentSelected = [];
        let count = 0;
        for (let index = 0; index < interests.length; index++) {

            currentSelected.push(<ButtonComponent
                title={interests[index]}
                isSelected={true}
                key={count}
                setValue={setInterests}
                interestCount={interestsCount}
                setInterestCount={setInterestsCount}
                interests={interests}
                alwaysInteractable={true}
                />)
            count++;
        }

        for(let index = 3 - interests.length; index > 0 ; --index)
            {
                currentSelected.push(<ButtonComponent
                    interestCount={interestsCount}
                    setInterestCount={setInterestsCount}
                    key={count}
                    interests={interests}
                    setValue={setInterests}/>
                )
                count++;
            }

        return currentSelected;
    }

    return (
        
        <ScrollView style={styles.container}
        stickyHeaderIndices={[0]}>
            <View style={{backgroundColor:"white",padding:20}}>
                <Text style={styles.headingTitle}>Interests</Text>
                <Text style={styles.m_y}>Select up to three interests that fits you</Text>
                
                <View style={styles.currentInterestsContainer}>
                    {
                        // Render the current saved interests by the user
                        renderCurrentSelected()
                    }
                </View>

            </View>

        {
            // This line of code renders a component that contains the choices available for for each category of interest
            categories.map(
                (category,index)=>(<CategoryComponent
                    interestCount={interestsCount}
                    setInterestCount={setInterestsCount}
                    category={category}
                    choices={choicesPerCategory[category as keyof typeof choicesPerCategory]}
                    key={index}
                    interests={interests}
                    setValue={setInterests}
                    addBorder={index+1 == categories.length ? true : false}
                />))
                
        }
        </ScrollView>        
    )
}

const CategoryComponent = (props:CategoryComponentProps)=>{
/*
    This component renders the buttons for each categories and the title of the category
*/
    const styles = StyleSheet.create({
        categoryTitle:{
            fontSize:20,
            fontWeight:"bold",
            marginBottom:10
        },

        choicesContainer:{
            flexDirection:"row",
            flexWrap:"wrap",
            padding:10,
            gap:10,
            alignItems:"center",
        },

        container: {
            borderBottomWidth:(props.addBorder ? 0 : 1),
            paddingHorizontal:1,
            paddingVertical:10,
            
        }

    })

    // This component will create a button component for each of choices belonging for this category.
    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{props.category}</Text>
            <View style={styles.choicesContainer}>
                {props.choices.map((choice,index)=>(<ButtonComponent
                interestCount={props.interestCount}
                setInterestCount={props.setInterestCount}
                setValue={props.setValue}
                title={choice}
                isSelected={props.interests.includes(choice)}
                interests={props.interests}
                key={index} 
                />))}
            </View>



        </View>
    )
}

const ButtonComponent = (props:ButtonProps) => {
    // This section is for modifiying the behaviour of the Pressable component when touched
    const animated = new Animated.Value(1);
    const fadeIn =()=>{
        Animated.timing(animated,{
            toValue:0.4,
            duration:100,
            useNativeDriver:true,
        }).start();
    }

    const fadeOut =()=>{
            Animated.timing(animated,{
                toValue:1,
                duration:200,
                useNativeDriver:true,
            }).start()
        }

    const styles = StyleSheet.create({
        blankOptionButton:{
            width:100,
            height:50,
            justifyContent:"center",
            borderWidth:1,
            borderStyle:"dashed",
            borderRadius:10,
            opacity:animated,
            margin:"auto"
        },

        selectedButton: {
            width:100,
            height:50,
            justifyContent:"center",
            opacity:animated,
            borderRadius:10,
            backgroundColor:"#14B7EA",
        },

        unselectedButton:{
            width:100,
            height:50,
            justifyContent:"center",
            opacity:animated,
            borderRadius:10,
            backgroundColor:"#EDEDED",
            
        },

        textStyleSelected:{
            textAlign:"center",
            color:"white",
            fontSize:12
        },
        
        defaultText:{
            textAlign:"center",
            fontSize:11
        }
    })
    // End of animation section


    function removeInterestFromCurrent(){
        /*
            This section removes the an interest from the current interests of the user
            when the button from the current interests of the user is clicked.The number of current interests is decremented
            when this function is active
        */

        // From the current interests of the user, remove the interest that matches the label of the button clicked
        const updatedList = props.interests.filter((value)=> value !== props.title);

        // Update the value from location 'interests' with the newly updated list to the local storage of the device.
        // This function then returns a promise and updates the current interest to update the view
        storeObjectData('interests', updatedList).then(()=>{
            props.setValue(updatedList)
            props.setInterestCount(props.interestCount-1);
        });
        
    }

    function addInterestToList(title:string){
        /*  
            This function adds a new interests from the current set of interests the user has selected. 
            After the completion of the function. The number of current interests the user has selected will then by
            incremented by one
        */
        
        // Create a copy of the the current list and add the new interest the user has pressed
        let newInterest:string[] = [];
        props.interests.map((value)=>newInterest.push(value))
        newInterest.push(title)

        /*
            This section updates the data from both the device's localStorage and the current value at key, 'interests'
            Furthermore, it updates the current data of the user.
         */
        storeObjectData('interests', newInterest).then(()=>{

            props.setInterestCount(props.interestCount+1);
            props.setValue(newInterest);
        });

    }

// This section of code is responsible for managing the behaviours  of the button

// This renders the default value of a button of an unfilled slot of interest
    if(props.title === undefined)
        return (

            <Pressable onPress={()=>{}}
            onPressIn={fadeIn} onPressOut={fadeOut} 
            disabled={true}
            >
                <Animated.View style ={styles.blankOptionButton}>
                    <Text style={styles.defaultText}>Option</Text>
                </Animated.View>
            </Pressable>
    
    )

    // This line of code ensures that the user can always remove their current interests
    else if(props.alwaysInteractable == true){
        return(
            <Pressable onPress={()=>removeInterestFromCurrent()}
            
            onPressIn={fadeIn} onPressOut={fadeOut}>
                <Animated.View style ={styles.selectedButton}>
                    <Text style={styles.textStyleSelected}>{props.title}</Text>
                </Animated.View>
            </Pressable>
        )
    }

    //This section is responsible for the behaviour of the choices of the button.
    // It disables the button to when the user has already has the max number of interests and re-enabled as long as it's below the maximum
    // It also prevents the user from selecting the same option twice.
    else {
        return (
            <Pressable onPress={()=>addInterestToList(props.title as string)}
            onPressIn={fadeIn} onPressOut={fadeOut}
            disabled={props.interests.includes(props.title) || props.interests.length == 3} 
            
            >
                <Animated.View style ={props.isSelected? styles.selectedButton:styles.unselectedButton}>
                    <Text style={props.isSelected ? styles.textStyleSelected:styles.defaultText}>{props.title}</Text>
                </Animated.View>
            </Pressable>
        )
    }   
}

export default InterestsPage;