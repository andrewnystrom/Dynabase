package com.dynabase.backend;

import java.util.List;

import com.dynabase.backend.dto.UserProfile;

import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/me")
public class UserResource {

    @Inject
    SecurityIdentity securityIdentity;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public UserProfile me() {
        String username = securityIdentity.getPrincipal().getName();
        String email = null;
        List<String> roles = List.copyOf(securityIdentity.getRoles());

        if (securityIdentity.getPrincipal() instanceof DefaultJWTCallerPrincipal jwtPrincipal) {
            email = jwtPrincipal.getClaim("email");
        }

        return new UserProfile(username, email, roles);
    }
}

