//package lostcost.lostcost.service;
//
//import lostcost.lostcost.dto.OsmPointDTO;
//import lostcost.lostcost.entity.OsmPoint;
//import lostcost.lostcost.repository.OsmPointRepository;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.CompletableFuture;
//
//@Service
//public class OsmPointService {
//
//    private final OsmPointRepository osmPointRepository;
//
//    public OsmPointService(OsmPointRepository osmPointRepository) {
//        this.osmPointRepository = osmPointRepository;
//    }
//
////    @Async("taskExecutor")
//    public CompletableFuture<List<OsmPointDTO>> searchOsmPointsByName(String name) {
//        List<OsmPoint> osmPoints = osmPointRepository.findByNameContainingIgnoreCase(name);
//        List<OsmPointDTO> osmPointDTOs = new ArrayList<>();
//
//        for (OsmPoint osmPoint : osmPoints) {
//            OsmPointDTO osmPointDTO = new OsmPointDTO();
//            osmPointDTO.setName(osmPoint.getName());
//            osmPointDTO.setLongitude(osmPoint.getOsmNode().getLongitude());
//            osmPointDTO.setLatitude(osmPoint.getOsmNode().getLatitude());
//            osmPointDTOs.add(osmPointDTO);
//        }
//
//        return CompletableFuture.completedFuture(osmPointDTOs);
//    }
//}
