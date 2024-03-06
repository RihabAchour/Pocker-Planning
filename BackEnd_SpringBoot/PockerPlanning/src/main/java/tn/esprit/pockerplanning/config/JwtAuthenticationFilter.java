package tn.esprit.pockerplanning.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tn.esprit.pockerplanning.repositories.UserRepository;
import tn.esprit.pockerplanning.services.IJWTServices;

import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter  extends OncePerRequestFilter {
     private final IJWTServices jwtService;
     private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
//hnee naamlou fi check

        if (authHeader == null ||!authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);

            return;
        }

        //extraction de token min authheader
        //yebda mi 7 khtr kn ne7sbou kelmet bearer nal9aw feha 6 7rouf + espace
        jwt = authHeader.substring(7);
        //extraction useremail m token
        userEmail=jwtService.extractUsername(jwt);
        //ken aana useremail w user mouch authenticated
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
            //nekhdhou userdetails min BD
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            //check if user valid ou non
            //kn valid lezim naamlou update li securitycontext wnabaath request lildispatcher servlet
          if(jwtService.isTokenValid(jwt,userDetails)){

              UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                      userDetails,
                      null,
                      userDetails.getAuthorities()
              );
              authToken.setDetails(
                      new WebAuthenticationDetailsSource().buildDetails(request)
              );
              SecurityContextHolder.getContext().setAuthentication(authToken);

          }
        }
        filterChain.doFilter(request,response);
    }
}
