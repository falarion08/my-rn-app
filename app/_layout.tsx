import { Stack } from "expo-router";

/*  
    This section of the codes is mainly responsibe for proper rendering of components for their corresponding routes.
    This also allows smooth animation to occur as the user navigates different routes as well as modifying 
    how some content are rendered
 */
const RouteLayout = () =>{
    return(
        <Stack>
            <Stack.Screen name ="index" options={{
                headerTitle:"",
            }}/>
            <Stack.Screen name="ethnicity/index" options={{
                headerTitle:"Ethnicity",
                headerBackTitle:"Cancel"
            }}/>
            <Stack.Screen name="interests/index" options={{
                headerTitle:"",
                headerBackTitle:"Back"
            }}/>
                <Stack.Screen name="songs_prompt/index" options={{
                headerTitle:"Music Prompt",
                headerTitleAlign:"center",
                headerBackTitle:"Back"
            }}/>
        </Stack>
)}

export default RouteLayout;