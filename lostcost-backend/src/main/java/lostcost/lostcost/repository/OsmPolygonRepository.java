package lostcost.lostcost.repository;

import lostcost.lostcost.dto.OsmEntityDTO;
import lostcost.lostcost.entity.OsmPolygon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OsmPolygonRepository extends JpaRepository<OsmPolygon, Long> {
    List<OsmPolygon> findByNameContainingIgnoreCase(String name);
}
