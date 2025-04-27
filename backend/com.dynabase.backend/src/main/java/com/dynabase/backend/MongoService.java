package com.dynabase.backend;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MongoService {

    @Inject
    MongoClient mongoClient; // <-- Inject MongoClient, not MongoDatabase

    private MongoDatabase getDatabase() {
        return mongoClient.getDatabase("dynabase"); // same as your quarkus.mongodb.database property
    }

    public List<String> listDocuments() {
        MongoCollection<Document> collection = getDatabase().getCollection("example");
        List<String> results = new ArrayList<>();
        for (Document doc : collection.find()) {
            results.add(doc.toJson());
        }
        return results;
    }

    public void insertExampleDocument(String data) {
        MongoCollection<Document> collection = getDatabase().getCollection("example");
        Document document = new Document()
                .append("data", data)
                .append("createdAt", System.currentTimeMillis());
        collection.insertOne(document);
    }
}
