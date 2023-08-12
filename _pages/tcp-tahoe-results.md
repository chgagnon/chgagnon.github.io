---
layout: default
title: TCP Tahoe Results
---

# Window scaling plots for transmission of 1 MB file over a lossy connection

## Without TCP Tahoe enabled
![Window scaling without Tahoe](/assets/images/abc-lossy-no-congestion-window.png)
## With TCP Tahoe
![Window scaling with Tahoe](/assets/images/abc-lossy-tahoe-window.png)

# Stevens curves for transmission of a 1 MB file over a lossy connection

## Without TCP Tahoe enabled
![Stevens curve without Tahoe](/assets/images/abc-lossy-no-congestion-stevens.png)
## With TCP Tahoe
![Stevens curve with Tahoe](/assets/images/abc-lossy-tahoe-stevens.png)

# Discussion
As shown in the window scaling plots, when **TCP Tahoe** congestion control is applied, the maximum number of bytes in flight (the "high point" of the blue curve at each time step) increases linearly-both at the beginning of the connection and after retransmissions (due to **Slow Start**)-and then increases at a slowing rate after that initial phase (due to **Congestion Avoidance** once `cwnd` is greater than `ssthresh`).

In comparison, when no congestion control is applied, the number of bytes in flight frequently reaches the maximum window size (which is 2^16 - 1, equal to 65535), and also often falls to 0 (likely because the sender is waiting for new bytes to be added to the send buffer).

When **Tahoe** congestion control is applied, the Stevens sequence number plot has fewer vertical "jumps" than the plot for the connection without congestion control. Each "jump" indicates transmision of a packet with a lower sequence number than the previously-transmitted packet (i.e. packet retransmission) which suggests that the sender and/or receiver is overwhelmed with data and/or has a lossy connection.

Less frequent retransmission, as well as less time between retransmitting a packet and transmisison of the next new packet, are both consistent with congestion control, since:

1. **Slow Start** and **Congestion Avoidance** both make it less likely that the rate of data transmission overwhelms the receiver, and should therefore decrease the number of packets dropped.


2. **Fast Retransmit / Fast Recovery** should decrease the time that the receiver waits for a retransmission, and therefore allow the sender to send the next packet of new data sooner (because the retransmitted packet will be ACK'd sooner and increment the window forward).


Overall, when **Tahoe** congestion control is applied, data transmission is "smoother" (i.e. the number of bytes in flight changes less erratically).


Even so, the total transmission time for a 1 MB sendfile was **longer** with congestion control applied, likely because the average congestion-controlled packet size is smaller. Therefore, even though congestion control provides a more "consistent" data stream, for our implementation, that "slow and steady" approach loses the race.


In a network with **more traffic** (such as a scenario where multiple nodes send large files simultaneously), congestion control could make transmission **faster**, because the lower rate of packet retransmission could be more significant than the effect of a smaller average packet size.


