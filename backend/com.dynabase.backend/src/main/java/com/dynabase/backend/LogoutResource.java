package com.dynabase.backend;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;

@Path("/logout")
public class LogoutResource {

    @GET
    public Response logout() {
        // Redirect the user to Keycloak logout endpoint
        String keycloakLogoutUrl = UriBuilder.fromUri("http://localhost:8180/realms/dynabase/protocol/openid-connect/logout")
            .queryParam("redirect_uri", "http://localhost:3000")
            .build()
            .toString();

        return Response.seeOther(java.net.URI.create(keycloakLogoutUrl)).build();
    }
}
