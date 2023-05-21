package lostcost.lostcost.service;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.config.CHProfile;
import com.graphhopper.config.Profile;
import com.graphhopper.reader.osm.GraphHopperOSM;
import com.graphhopper.util.PointList;
import com.graphhopper.util.shapes.GHPoint;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class GHRoutingService {
    private final GraphHopper hopper;

    public GHRoutingService() {
        this.hopper = createGraphHopperInstance("path/to/your/osm/file");
    }

    static GraphHopper createGraphHopperInstance(String ghLoc) {
        GraphHopper hopper = new GraphHopper();
        hopper.setOSMFile("C:\\My Files\\WORKSPACE\\Self Taught\\ReactNative\\bangladesh-latest.osm");  // Adjusted path to your OSM file
        hopper.setGraphHopperLocation("target/routing-graph-cache");

        hopper.setProfiles(new Profile("car").setVehicle("car").setWeighting("fastest").setTurnCosts(false));
        hopper.getCHPreparationHandler().setCHProfiles(new CHProfile("car"));

        hopper.importOrLoad();
        return hopper;
    }

    public GHResponse calculateRoute(double fromLat, double fromLon, double toLat, double toLon) {
        GHRequest req = new GHRequest(fromLat, fromLon, toLat, toLon).setProfile("car");
        GHResponse rsp = hopper.route(req);
        return rsp;
    }
}
