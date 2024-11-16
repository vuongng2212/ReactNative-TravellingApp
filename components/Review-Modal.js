import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';
import StarIcon from "../assets/star.png";

const ReviewModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  rating, 
  setRating, 
  comment, 
  setComment 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Your Review</Text>
          
          <View style={styles.ratingSelection}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
              >
                <Image
                  source={StarIcon}
                  style={[
                    styles.starIcon,
                    { opacity: star <= rating ? 1 : 0.3 }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder="Write your review here..."
            multiline
            value={comment}
            onChangeText={setComment}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  ratingSelection: {
    flexDirection: 'row',
    marginBottom: 20
  },
  starIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 2
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#ddd'
  },
  submitButton: {
    backgroundColor: '#58b5b9'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ReviewModal;