/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects = [], setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data.repos);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post("repositories", {
      title: "ZedJS",
      techs: "NodeJS, ReactJS, React Native",
    });

    console.log(response.data);

    setProjects([...projects, response.data.repo]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project._id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159C1",
  },

  project: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
