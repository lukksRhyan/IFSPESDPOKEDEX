import { TouchableOpacity, ImageBackground, Text } from 'react-native';

function GenCard({ navigation, generation }) {
  let BackgroundImageSource;

  switch (generation) {
    case 'I':
      BackgroundImageSource = require('./Assets/GenBackground/I.jpg');
      break;
    case 'II':
      BackgroundImageSource = require('./Assets/GenBackground/II.jpg');
      break;
    case 'III':
      BackgroundImageSource = require('./Assets/GenBackground/III.jpg');
      break;
    case 'IV':
      BackgroundImageSource = require('./Assets/GenBackground/IV.jpg');
      break;
    case 'V':
      BackgroundImageSource = require('./Assets/GenBackground/V.jpg');
      break;
    case 'VI':
      BackgroundImageSource = require('./Assets/GenBackground/VI.jpg');
      break;
    case 'VII':
      BackgroundImageSource = require('./Assets/GenBackground/VII.jpg');
      break;
    case 'VIII':
      BackgroundImageSource = require('./Assets/GenBackground/VIII.jpg');
      break;
    case 'IX':
      BackgroundImageSource = require('./Assets/GenBackground/IX.jpg');
      break;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Gen', { generation })}
    >
      <ImageBackground
        source={BackgroundImageSource}
        resizeMode=''
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          opacity:'100%',
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: '#ffcb05',
            textShadowColor: '#1d2c5e',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            fontWeight: '700',
          }}
        >
          GERAÇÃO {generation}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default GenCard;
