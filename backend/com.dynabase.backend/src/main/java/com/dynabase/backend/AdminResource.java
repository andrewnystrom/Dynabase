package com.dynabase.backend;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/admin")
public class AdminResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @RolesAllowed("admin")
    public String adminOnly() {
        return "Hello Admin! You are authenticated.";
    }
}
