import react from "react";
import { Modal } from "react-native";

//Component for modals

const ModalComponent = ({modalVisible, children}) => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          {children}
      </Modal>
  )
}

export default ModalComponent;