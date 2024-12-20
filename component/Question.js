import React from 'react';
import {
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

const Question = ({ question, onChange }) => {
  const handleLabelChange = (text) => {
    onChange({ ...question, label: text });
  };

  const addOption = () => {
    const updatedOptions = [...(question.options || []), ''];
    onChange({ ...question, options: updatedOptions });
  };

  const updateOption = (index, value) => {
    const updatedOptions = question.options.map((opt, i) =>
      i === index ? value : opt
    );
    onChange({ ...question, options: updatedOptions });
  };

  const addRow = () => {
    const updatedRows = [...(question.rows || []), ''];
    onChange({ ...question, rows: updatedRows });
  };

  const updateRow = (rowIndex, value) => {
    const updatedRows = question.rows.map((row, index) =>
      index === rowIndex ? value : row
    );
    onChange({ ...question, rows: updatedRows });
  };

  const addColumn = () => {
    const updatedColumns = [...(question.columns || []), ''];
    onChange({ ...question, columns: updatedColumns });
  };

  const updateColumn = (colIndex, value) => {
    const updatedColumns = question.columns.map((col, index) =>
      index === colIndex ? value : col
    );
    onChange({ ...question, columns: updatedColumns });
  };

  const renderGrid = () => (
    <View style={styles.gridContainer}>
      <FlatList
        data={question.rows || []}
        keyExtractor={(item, index) => `row-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.gridRow}>
            <Text style={styles.gridRowText}>{item || `Row ${index + 1}`}</Text>
            {(question.columns || []).map((col, colIndex) => (
              <TextInput
                key={`cell-${index}-${colIndex}`}
                style={styles.gridCell}
                placeholder={`${col || `Column ${colIndex + 1}`}`}
              />
            ))}
          </View>
        )}
      />
    </View>
  );

  switch (question.type) {
    case 'Text':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Text Question:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question label"
            value={question.label}
            onChangeText={handleLabelChange}
          />
        </View>
      );

    case 'CheckBox':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Checkbox Question:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question label"
            value={question.label}
            onChangeText={handleLabelChange}
          />
          {question.options?.map((option, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(text) => updateOption(index, text)}
            />
          ))}
          <Button title="Add Option" onPress={addOption} />
        </View>
      );

    case 'Grid':
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Grid Question:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter question label"
            value={question.label}
            onChangeText={handleLabelChange}
          />
          <Text style={styles.subLabel}>Rows:</Text>
          {question.rows?.map((row, index) => (
            <TextInput
              key={`row-${index}`}
              style={styles.input}
              placeholder={`Row ${index + 1}`}
              value={row}
              onChangeText={(text) => updateRow(index, text)}
            />
          ))}
          <Button title="Add Row" onPress={addRow} />
          <Text style={styles.subLabel}>Columns:</Text>
          {question.columns?.map((col, index) => (
            <TextInput
              key={`col-${index}`}
              style={styles.input}
              placeholder={`Column ${index + 1}`}
              value={col}
              onChangeText={(text) => updateColumn(index, text)}
            />
          ))}
          <Button title="Add Column" onPress={addColumn} />
          <Text style={styles.subLabel}>Grid Preview:</Text>
          {renderGrid()}
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  gridContainer: {
    marginTop: 10,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  gridRowText: {
    width: 80,
    fontWeight: 'bold',
  },
  gridCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    padding: 5,
    textAlign: 'center',
  },
});

export default Question;
