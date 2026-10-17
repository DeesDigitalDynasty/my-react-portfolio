import { useState, useEffect, useRef } from "react";
import type { Theme } from "../types";
import { ORB } from "../data/orbData";
import { adjustLight } from "../utils/adjustLight";
import { OrbIcon } from "./OrbIcon";
import photo from "../assets/Pro Pic.jpg";

export function OrbitalHero({ T }: { T: Theme }) {
  const [rot, setRot] = useState(0);
  const [autoRot, setAutoRot] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [pulseIds, setPulseIds] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const rotRef = useRef(0);
  const drag = useRef({
    on: false,
    startX: 0,
    startY: 0,
    startAng: 0,
    moved: false,
    directionDetermined: false,
    isHorizontalDrag: false,
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoRot) return;
    const id = setInterval(() => {
      rotRef.current = (rotRef.current + 0.22) % 360;
      setRot(rotRef.current);
    }, 50);
    return () => clearInterval(id);
  }, [autoRot]);

  const onPD = (e: React.PointerEvent<HTMLDivElement>) => {
    if (expanded != null) return;
    drag.current = {
      on: true,
      startX: e.clientX,
      startY: e.clientY,
      startAng: rotRef.current,
      moved: false,
      directionDetermined: false,
      isHorizontalDrag: false,
    };
  };

  const onPM = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;

    // Check gesture direction intent
    if (!drag.current.directionDetermined) {
      if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
        drag.current.directionDetermined = true;
        if (Math.abs(dx) > Math.abs(dy)) {
          drag.current.isHorizontalDrag = true;
          setAutoRot(false);
        } else {
          // Vertical swipe intent: release and allow normal page scroll
          drag.current.isHorizontalDrag = false;
          drag.current.on = false;
          return;
        }
      } else {
        return;
      }
    }

    if (drag.current.isHorizontalDrag) {
      drag.current.moved = true;
      const speed = isMobile ? 0.48 : 0.38;
      const a = (drag.current.startAng + dx * speed + 3600) % 360;
      rotRef.current = a;
      setRot(a);
    }
  };

  const onPU = () => {
    if (!drag.current.on && !drag.current.moved) return;
    drag.current.on = false;
    if (expanded == null) setAutoRot(true);
  };

  const dismiss = () => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setExpanded(null);
    setPulseIds([]);
    setAutoRot(true);
  };

  const toggleNode = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (expanded === id) {
      setExpanded(null);
      setPulseIds([]);
      setAutoRot(true);
    } else {
      setExpanded(id);
      setAutoRot(false);
      setPulseIds(ORB.find((x) => x.id === id)?.relatedIds ?? []);
    }
  };

  const radius = isMobile ? 128 : 190;
  const orbitSize = isMobile ? 290 : 420;
  const photoSize = isMobile ? 74 : 90;

  const calcPos = (idx: number, total: number) => {
    const angle = ((idx / total) * 360 + rot) % 360;
    const rad = (angle * Math.PI) / 180;
    const depth = Math.cos(rad);
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      z: Math.round(100 + 50 * depth),
      op: Math.max(0.45, 0.45 + 0.55 * ((1 + depth) / 2)),
      sc: Math.max(0.78, 0.78 + 0.22 * ((1 + depth) / 2)),
    };
  };

  const cardBg = T.dark ? "rgba(8,13,20,0.97)" : "rgba(255,255,255,0.98)";
  const cardBd = T.dark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.18)";

  const activeItem = expanded != null ? ORB.find((x) => x.id === expanded) : null;
  const activeColor = activeItem
    ? T.dark
      ? activeItem.color
      : adjustLight(activeItem.color)
    : T.accent;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onClick={dismiss}
    >
      <div
        onPointerDown={onPD}
        onPointerMove={onPM}
        onPointerUp={onPU}
        onPointerCancel={onPU}
        onClick={dismiss}
        style={{
          position: "relative",
          width: orbitSize,
          height: orbitSize,
          flexShrink: 0,
          cursor: drag.current.on ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "pan-y",
        }}
      >
        {/* Orbit rings */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `1px solid ${
              T.dark ? "rgba(255,255,255,.18)" : "rgba(0,0,0,.14)"
            }`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: isMobile ? -14 : -22,
            borderRadius: "50%",
            border: `1px dashed ${
              T.dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.10)"
            }`,
            pointerEvents: "none",
          }}
        />

        {/* Centre photo */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 160,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -14,
              borderRadius: "50%",
              border: `1px solid ${T.accent}22`,
              animation: "ping 2.4s ease infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: -7,
              borderRadius: "50%",
              border: `1px solid ${T.accent}33`,
              animation: "ping 2.4s ease .9s infinite",
            }}
          />
          <div
            style={{
              width: photoSize,
              height: photoSize,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2.5px solid ${T.accent}88`,
              boxShadow: `0 0 28px ${T.accent}55,0 0 60px ${T.accent}1a`,
            }}
          >
            <img
              src={photo}
              alt="DAYO"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
        </div>

        {/* Nodes */}
        {ORB.map((item, i) => {
          const pos = calcPos(i, ORB.length);
          const isExp = expanded === item.id;
          const isRel = pulseIds.includes(item.id);
          const nc = T.dark ? item.color : adjustLight(item.color);

          return (
            <div
              key={item.id}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => toggleNode(e, item.id)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${
                  pos.y
                }px)) scale(${isExp ? (isMobile ? 1.2 : 1.4) : pos.sc})`,
                zIndex: isExp ? 210 : pos.z,
                opacity: isExp ? 1 : pos.op,
                transition: "transform .32s ease, opacity .25s ease",
                cursor: "pointer",
                pointerEvents: "all",
              }}
            >
              {isRel && (
                <div
                  style={{
                    position: "absolute",
                    inset: -5,
                    borderRadius: "50%",
                    border: `2px solid ${nc}`,
                    animation: "pulse 1s ease infinite",
                    pointerEvents: "none",
                  }}
                />
              )}

              <div
                style={{
                  width: isMobile ? 36 : 40,
                  height: isMobile ? 36 : 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isExp
                    ? nc
                    : isRel
                    ? `${nc}44`
                    : T.dark
                    ? "#03060a"
                    : "#eef2f7",
                  border: `2px solid ${isExp || isRel ? nc : `${nc}66`}`,
                  boxShadow: isExp
                    ? `0 0 22px ${nc}88, 0 0 44px ${nc}33`
                    : "none",
                  transition: "all .28s",
                  fontSize: 14,
                  fontWeight: 700,
                  color: isExp ? "#fff" : nc,
                }}
              >
                <OrbIcon
                  name={item.icon}
                  size={isMobile ? 16 : 18}
                  color={isExp ? "#fff" : nc}
                  title={item.title}
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  top: isMobile ? 40 : 44,
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? 8.5 : 9,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textAlign: "center",
                  color: isExp
                    ? T.text
                    : T.dark
                    ? "rgba(255,255,255,.88)"
                    : "rgba(0,0,0,.75)",
                  transition: "color .28s",
                  pointerEvents: "none",
                }}
              >
                {item.title}
              </div>

              {/* Desktop Expanded Card */}
              {!isMobile && isExp && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    top: 66,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 234,
                    background: cardBg,
                    border: `1px solid ${cardBd}`,
                    borderRadius: 13,
                    padding: 15,
                    boxShadow: `0 24px 56px rgba(0,0,0,.4), 0 0 24px ${nc}1e`,
                    backdropFilter: "blur(16px)",
                    cursor: "default",
                    zIndex: 300,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -5,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 1,
                      height: 5,
                      background: nc,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 9,
                    }}
                  >
                    <span
                      style={{
                        background: `${nc}1e`,
                        color: nc,
                        border: `1px solid ${nc}44`,
                        borderRadius: 20,
                        padding: "2px 9px",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {item.status === "completed"
                        ? "DONE"
                        : item.status === "in-progress"
                        ? "ACTIVE"
                        : "PENDING"}
                    </span>
                    <span
                      style={{
                        color: T.muted,
                        fontSize: 9,
                        fontFamily: "monospace",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>

                  <h4
                    style={{
                      color: T.text,
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: T.muted,
                      fontSize: 11.5,
                      lineHeight: 1.7,
                      marginBottom: 12,
                    }}
                  >
                    {item.desc}
                  </p>

                  <div style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 10,
                        color: T.muted,
                        marginBottom: 4,
                      }}
                    >
                      <span>⚡ Proficiency</span>
                      <span style={{ fontFamily: "monospace" }}>
                        {item.energy}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: T.dark
                          ? "rgba(255,255,255,.07)"
                          : "rgba(0,0,0,.07)",
                        borderRadius: 3,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${item.energy}%`,
                          background: `linear-gradient(90deg,${nc}77,${nc})`,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div>
                      <p
                        style={{
                          color: T.muted,
                          fontSize: 9,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 5,
                        }}
                      >
                        Connected to
                      </p>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {item.relatedIds.map((rid) => {
                          const rel = ORB.find((x) => x.id === rid);
                          return rel ? (
                            <button
                              key={rid}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleNode(e, rid);
                              }}
                              style={{
                                background: "transparent",
                                border: `1px solid ${cardBd}`,
                                borderRadius: 6,
                                padding: "3px 8px",
                                fontSize: 10,
                                color: T.muted,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all .2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = nc;
                                e.currentTarget.style.color = nc;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = cardBd;
                                e.currentTarget.style.color = T.muted;
                              }}
                            >
                              {rel.title} →
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Bottom-Sheet Drawer */}
      {isMobile && activeItem && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: cardBg,
            borderTop: `1.5px solid ${activeColor}`,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: "20px 22px 28px",
            boxShadow: `0 -12px 40px rgba(0,0,0,0.5), 0 0 24px ${activeColor}33`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 1000,
            animation: "slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Top drag bar */}
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: T.border,
              margin: "0 auto 14px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `${activeColor}22`,
                  border: `1.5px solid ${activeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OrbIcon
                  name={activeItem.icon}
                  size={16}
                  color={activeColor}
                  title={activeItem.title}
                />
              </div>
              <h3
                style={{
                  color: T.text,
                  fontSize: 16,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {activeItem.title}
              </h3>
            </div>
            <button
              onClick={() => {
                setExpanded(null);
                setPulseIds([]);
                setAutoRot(true);
              }}
              aria-label="Close details"
              style={{
                background: "transparent",
                border: "none",
                color: T.muted,
                fontSize: 18,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                background: `${activeColor}1e`,
                color: activeColor,
                border: `1px solid ${activeColor}44`,
                borderRadius: 20,
                padding: "2px 9px",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {activeItem.status === "completed"
                ? "DONE"
                : activeItem.status === "in-progress"
                ? "ACTIVE"
                : "PENDING"}
            </span>
            <span
              style={{
                color: T.muted,
                fontSize: 10,
                fontFamily: "monospace",
              }}
            >
              {activeItem.date}
            </span>
          </div>

          <p
            style={{
              color: T.muted,
              fontSize: 13,
              lineHeight: 1.6,
              marginBottom: 14,
            }}
          >
            {activeItem.desc}
          </p>

          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: T.muted,
                marginBottom: 5,
              }}
            >
              <span>⚡ Proficiency</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700 }}>
                {activeItem.energy}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: T.dark
                  ? "rgba(255,255,255,.07)"
                  : "rgba(0,0,0,.07)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${activeItem.energy}%`,
                  background: `linear-gradient(90deg,${activeColor}77,${activeColor})`,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>

          {activeItem.relatedIds.length > 0 && (
            <div>
              <p
                style={{
                  color: T.muted,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Connected to
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {activeItem.relatedIds.map((rid) => {
                  const rel = ORB.find((x) => x.id === rid);
                  return rel ? (
                    <button
                      key={rid}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNode(e, rid);
                      }}
                      style={{
                        background: "transparent",
                        border: `1px solid ${cardBd}`,
                        borderRadius: 6,
                        padding: "5px 10px",
                        fontSize: 11,
                        color: T.muted,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all .2s",
                      }}
                    >
                      {rel.title} →
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}