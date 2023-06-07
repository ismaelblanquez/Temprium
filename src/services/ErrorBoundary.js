import React from 'react';
import { View, Text } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Lo siento, algo salió mal.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
