import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Movie {
    Title: string;
    Year: string;
}

const Home = ({ route }: { route: any }) => {
    const { user, color } = route.params || { user: '', color: '' };
    const [data, setData] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const baseurl = "http://www.omdbapi.com/?apikey=4e8a3a85";

    useEffect(() => {
        const imdbIDs = ['tt3896196', 'tt3896198', 'tt4154664', 'tt0103923', 'tt2597398', 'tt9335498', 'tt1563738'];
        getAPI(imdbIDs);
    }, []);

    const getAPI = (imdbIDs: string[]) => {
        const urls = imdbIDs.map(id => `${baseurl}&i=${id}`);
        axios.all(urls.map(url => axios.get(url)))
            .then(axios.spread((...responses) => {
                const moviesData = responses.map(res => res.data);
                setData(moviesData);
            }))
            .catch(err => console.log(err))
    };

    const handleBack = () => {
        navigation.navigate('Login');
    }

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.datetime}>{new Date().toLocaleString()}</Text>
            <Text style={styles.welcome}>Welcome {user}</Text>
            <FlatList
                data={data}
                ListEmptyComponent={() => (
                    <Text style={styles.datetime}>
                        No Data
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }: { item: Movie }) => (
                    <View style={
                        {backgroundColor: color,
                         flexDirection: 'row',
                         padding: 10,
                         borderRadius: 5,
                         marginBottom: 10,
                         width: 400,}
                    }>
                        <TouchableOpacity onPress={() => openModal(item)}>
                            <Image source={{ uri: item.Poster }} style={styles.poster} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openModal(item)}>
                            <View style={styles.movieInfo}>
                                <Text style={styles.titleText}>{item.Title}</Text>
                                <Text style={styles.yearText}>{item.Year}</Text>
                            </View>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitleText}>Movie Detail</Text>
                                    <Image source={{ uri: selectedMovie?.Poster }} style={styles.modalPoster} />
                                    <View style={styles.modalMovieInfo}>
                                        <Text style={styles.modalTitleText}>Movie Name: {selectedMovie?.Title}</Text>
                                        <Text style={styles.modalYearText}>Release Date: {selectedMovie?.Year}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#636390',
        paddingTop: 20,
    },
    datetime: {
        fontSize: 20,
        marginBottom: 12,
    },
    welcome: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    button: {
        width: '30%',
        height: 40,
        backgroundColor: '#c721fd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
     movieContainer: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
     },
     poster: {
        width: 80,
        height: 80,
        marginRight: 10,
     },
     movieInfo: {
        flex: 1,
     },
     titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
     },
     yearText: {
       fontSize: 16,
     },
     modalContainer: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
     },
     modalContent: {
         backgroundColor: '#83f28f',
         borderRadius: 10,
         padding: 20,
         alignItems: 'center',
     },
     modalPoster: {
         width: 120,
         height: 120,
         marginBottom: 10,
     },
     modalMovieInfo: {
         alignItems: 'center',
     },
     modalTitleText: {
         fontSize: 20,
         fontWeight: 'bold',
         marginBottom: 5,
         color: '#000',
     },
     modalYearText: {
         fontSize: 20,
         color: '#000',
     },

     closeButton: {
        width: 80,
        height: 40,
        backgroundColor: '#c721fd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
     }

});

export default Home;