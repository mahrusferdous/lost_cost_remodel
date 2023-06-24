package lostcost.lostcost.service;

import lostcost.lostcost.dto.OsmPointDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;

    public GeocodingService() {
        this.restTemplate = new RestTemplate();
    }

    @Async("taskExecutor")
    public List<OsmPointDTO> geocode(String placeName) {
        String nominatimUrl = "https://nominatim.openstreetmap.org/search?format=json&q=" + placeName;
        String response = restTemplate.getForObject(nominatimUrl, String.class);
        JSONArray jsonArray = new JSONArray(response);

        List<OsmPointDTO> locations = new ArrayList<>();

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject result = jsonArray.getJSONObject(i);
            double lat = result.getDouble("lat");
            double lon = result.getDouble("lon");
            String name = result.getString("display_name");  // get the name of the location
            OsmPointDTO point = new OsmPointDTO();
            point.setName(name);
            point.setLatitude(lat);
            point.setLongitude(lon);
            locations.add(point);
        }

        if (locations.isEmpty()) {
            throw new IllegalArgumentException("Unable to geocode place name: " + placeName);
        }

        return locations;
    }

}