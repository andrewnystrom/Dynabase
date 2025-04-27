package com.dynabase.backend;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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
    public Map<String, Object> me() {
        Map<String, Object> userInfo = new HashMap<>();

        userInfo.put("username", securityIdentity.getPrincipal().getName());

        Set<String> roles = securityIdentity.getRoles();
        userInfo.put("roles", roles);

        if (securityIdentity.getPrincipal() instanceof DefaultJWTCallerPrincipal jwtPrincipal) {
            String email = jwtPrincipal.getClaim("email");
            userInfo.put("email", email);
        }

        return userInfo;
    }
}
