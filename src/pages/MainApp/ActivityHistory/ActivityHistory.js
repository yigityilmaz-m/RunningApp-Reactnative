import React, { useState, useEffect ,useContext} from 'react';
import { View, Text } from 'react-native';
import database from '@react-native-firebase/database';
import ActivityHistoryCard from '../../../components/ActivityHistoryCard';
import { UserContext } from '../../../context/UserProvider';


export default function ActivityHistory() {
  const [userActivities, setUserActivities] = useState([])
  const { state } = useContext(UserContext)

  useEffect(() => {
    listenActivityChanges()
  }, [])


  function listenActivityChanges() {
    
    database()
      .ref(`users/${state.userId}/activities`)
      .on('value', snapshot => {
        const activity = snapshot.val();
        if (!!activity) {
          setUserActivities(Object.keys(activity).map(k => ({
            id: k,
            ...activity[k]
          })
          ))
        }
      })

  }

  const renderItem = ({ item }) => (
    <View>
      <ActivityHistoryCard activ={item} />
    </View>
  );

  return (
    <View>
      {!!userActivities.length ?
        (userActivities.map(b => (
          <ActivityHistoryCard activ={b} key={b.id} />
        ))) : <Text style={{ textAlign: 'center' }}>There is nothing to see</Text>}
    </View>
  )
}
