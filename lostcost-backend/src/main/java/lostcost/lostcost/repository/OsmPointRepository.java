package lostcost.lostcost.repository;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OsmPointRepository extends JpaRepository<OsmPoint, Long> {
    List<OsmPoint> findByNameContainingIgnoreCase(String name);
}
