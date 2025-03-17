import UserListItem from "@/components/UserListItem";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function UsersScreen() {
    const [users, setUsers] = useState<any[]>([])
    const { profile } = useAuth()
    

    useEffect(() =>{
        const fetchUsers = async () => {
            let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .neq('id', profile.id)

            if (profiles) {
                setUsers(profiles)
            }
        }
        fetchUsers()
        
    }, [])
    
    return (
        <FlatList 
            data={users}
            contentContainerStyle={{ gap: 5 }}
            renderItem={ ({ item }) => <UserListItem user={item} /> }
            style={{ marginVertical: '3%' }}
        />
    )
}