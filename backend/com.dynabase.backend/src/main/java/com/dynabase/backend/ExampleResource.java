package com.dynabase.backend;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/examples")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExampleResource {

    @Inject
    MongoService mongoService;

    @GET
    public List<String> listExamples() {
        return mongoService.listDocuments();
    }

    @POST
    public void addExample(String data) {
        mongoService.insertExampleDocument(data);
    }
}
