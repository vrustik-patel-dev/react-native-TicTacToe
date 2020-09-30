import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon, Header } from 'react-native-elements';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            gameState: [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            currentPlayer: 1,
            turn: 'Player O'
        }

    }

    componentDidMount() {
        this.initializeGame();
    }

    initializeGame = () => {
        this.setState({gameState:
        [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
        });
    }

    getWinner = () => {
        var arr = this.state.gameState;
        var sum;

        for(var i=0; i<3; i++) {
            sum = arr[i][0] + arr[i][1] + arr[i][2];
            if (sum == 3) { return 1; }
            else if (sum == -3) { return -1; }
        }

        for(var j=0; j<3; j++) {
            sum = arr[0][j] + arr[1][j] + arr[2][j];
            if (sum == 3) { return 1; }
            else if (sum == -3) { return -1; }
        }

        sum = arr[0][0] + arr[1][1] + arr[2][2];
        if (sum == 3) { return 1; }
        else if (sum == -3) { return -1; }

        sum = arr[2][0] + arr[1][1] + arr[0][2];
        if (sum == 3) { return 1; }
        else if (sum == -3) { return -1; }

        return 0;
    }

    onTilePress = (row, col) => {
        var value = this.state.gameState[row][col];
        if (value !== 0) { return; }

        var currentPlayer = this.state.currentPlayer;

        var arr = this.state.gameState.slice();
        arr[row][col] = currentPlayer;
        this.setState({gameState: arr})

        var nextPlayer = (currentPlayer == 1) ? -1 : 1;
        this.setState({currentPlayer: nextPlayer});
        var winner = this.getWinner();

        if (winner == 1) {
            Alert.alert('Player O is the winner');
            this.initializeGame();
        } else if (winner == -1) {
            Alert.alert('Player X is the winner');
            this.initializeGame();
        }

        if (nextPlayer == 1) {
            this.setState({turn: 'Player O'})
        } else if (nextPlayer == -1) {
            this.setState({turn: 'Player X'})
        }
    }

    renderIcon = (row, col) => {
        var value= this.state.gameState[row][col];
        switch(value)
        {
            case -1: return <Icon name='x' type='feather' size={90} color='#ff0037' />;
            case 1: return <Icon name='circle' type='feather' size={70} color='#c3e888' />;
            default: return <View />;
        }
    }


    render() {
        return(
        <View style={{ flex:1, backgroundColor: '#305745' }}>
            <View style={[styles.titleContainer, {borderBottomWidth: 3, borderRadius: 50, borderColor: '#fff'}]}>
                <Text style={styles.title}> Tic - Tac - Toe </Text>
            </View>

            <View style={styles.titleContainer} >
                <Text style={styles.player}> Turn : {this.state.turn} </Text>
            </View>

            <View style={styles.container}>


                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => this.onTilePress(0,0)} activeOpacity={1} style={[styles.tile, { borderLeftWidth: 0,borderTopWidth: 0 }]} >
                        {this.renderIcon(0,0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(0,1)} activeOpacity={1} style={[styles.tile, { borderTopWidth: 0 }]} >
                        {this.renderIcon(0,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(0,2)} activeOpacity={1} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0}]} >
                        {this.renderIcon(0,2)}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => this.onTilePress(1,0)} activeOpacity={1} style={[styles.tile, { borderLeftWidth: 0 }]} >
                        {this.renderIcon(1,0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(1,1)} activeOpacity={1} style={styles.tile} >
                        {this.renderIcon(1,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(1,2)} activeOpacity={1} style={[styles.tile, { borderRightWidth: 0 }]} >
                        {this.renderIcon(1,2)}
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => this.onTilePress(2,0)} activeOpacity={1} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
                        {this.renderIcon(2,0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(2,1)} activeOpacity={1} style={[styles.tile, { borderBottomWidth: 0 }]} >
                        {this.renderIcon(2,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilePress(2,2)} activeOpacity={1} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0}]} >
                        {this.renderIcon(2,2)}
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => {
                            this.initializeGame();
                        }}
                    >
                        <Text>Reset  </Text>
                        <Icon name="refresh" size={16} color="#292d3e" />
                    </TouchableOpacity>
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },

    title: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'serif'
    },

    player: {
        fontSize: 20,
        color: '#fff'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    tile: {
        borderWidth: 5,
        borderColor: '#fff',
        width: 100,
        height: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    openButton: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 15,
        elevation: 2
    }
});