package lostcost.lostcost.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OsrmService {

    private static final String OSRM_BASE_URL = "http://localhost:5000/";
    private RestTemplate restTemplate = new RestTemplate();

    public String getRoute(String coordinates) {
        String url = OSRM_BASE_URL + "route/v1/driving/" + coordinates + "?overview=false";
        System.out.println("URL: " + url);  // log the URL
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    public String getRoute(String profile,String fromLongitude, String fromLatitude, String toLongitude, String toLatitude) {
        RestTemplate restTemplate = new RestTemplate();
        String coordinates = fromLongitude + "," + fromLatitude + ";" + toLongitude + "," + toLatitude;
        String resourceUrl = OSRM_BASE_URL + "route/v1/" + profile + "/" + coordinates + "?overview=full";
        ResponseEntity<String> response = restTemplate.getForEntity(resourceUrl, String.class);
        return response.getBody();
    }
}