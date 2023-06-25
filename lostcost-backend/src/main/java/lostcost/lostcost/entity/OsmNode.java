package lostcost.lostcost.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "planet_osm_nodes")
public class OsmNode {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @OneToOne(mappedBy = "osmNode", fetch = FetchType.LAZY)
    private OsmRoad osmRoad;

    @OneToOne(mappedBy = "osmNode", fetch = FetchType.LAZY)
    private OsmPoint osmPoint;

    @OneToOne(mappedBy = "osmNode", fetch = FetchType.LAZY)
    private OsmLine osmLine;

    @OneToOne(mappedBy = "osmNode", fetch = FetchType.LAZY)
    private OsmPolygon osmPolygon;
}
