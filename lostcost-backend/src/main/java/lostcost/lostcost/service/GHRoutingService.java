package lostcost.lostcost.service;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.config.CHProfile;
import com.graphhopper.config.Profile;
import com.graphhopper.util.PointList;
import com.graphhopper.util.shapes.GHPoint;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;

@Service
public class GHRoutingService {
    private final GraphHopper hopper;
    private final Executor executor;

    public GHRoutingService(Executor executor) {
        this.executor = executor;
        this.hopper = createGraphHopperInstance();
    }

    static GraphHopper createGraphHopperInstance() {
        GraphHopper hopper = new GraphHopper();
        hopper.setOSMFile("C:\\My Files\\WORKSPACE\\Self Taught\\Java\\bangladesh-latest.osm.pbf");  // Adjusted path to your OSM file
        hopper.setGraphHopperLocation("target/routing-graph-cache");

        hopper.setProfiles(new Profile("car").setVehicle("car").setWeighting("fastest").setTurnCosts(false));
        hopper.getCHPreparationHandler().setCHProfiles(new CHProfile("car"));

        hopper.importOrLoad();
        return hopper;
    }

    @Async("taskExecutor")
    public CompletableFuture<GHResponse> calculateRoute(double fromLat, double fromLon, double toLat, double toLon) {
        return CompletableFuture.supplyAsync(() -> {
            GHRequest req = new GHRequest(fromLat, fromLon, toLat, toLon).setProfile("car");
            GHResponse rsp = hopper.route(req);

            if (rsp.hasErrors()) {
                // You can throw an exception here or handle the error in some other way
                throw new RuntimeException("No valid route found");
            }

            return rsp;
        }, executor).orTimeout(5, TimeUnit.SECONDS);
    }


    @Async("taskExecutor")
    public CompletableFuture<String> getPolyline(GHResponse rsp) {
        return CompletableFuture.supplyAsync(() -> {
            if (rsp.hasErrors()) {
                // handle or throw error
                return null;
            }

            PointList pointList = rsp.getBest().getPoints();
            StringBuilder polyline = new StringBuilder();

            for (GHPoint point : pointList) {
                polyline.append(point.getLat()).append(",").append(point.getLon()).append(";");
            }

            // Remove the trailing semicolon
            if (polyline.length() > 0) {
                polyline.setLength(polyline.length() - 1);
            }

            return polyline.toString();
        }, executor).orTimeout(5, TimeUnit.SECONDS); // Add a timeout of 5 seconds
    }
}