import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { RPCServer, createRPCError, RPCClient } from 'ocpp-rpc';
import { v4 as uuidv4 } from 'uuid';
import {
  RemoteStartTransactionPayload,
  RemoteStartTransactionResponse,
} from './payload-response.interface';

@Injectable()
export class OcppService implements OnModuleInit {
  private readonly server = new RPCServer({
    protocols: ['ocpp1.6'],
    strictMode: true,
  });

  private readonly clients = new Map<string, any>();

  async onModuleInit() {
    this.server.auth((accept, reject, handshake) => {
      accept({
        sessionId: uuidv4(),
      });
    });

    this.server.on('client', async (client) => {
      console.log(`${client.session.sessionId} connected!`);
      this.clients.set(client.session.sessionId, client);

      client.handle('BootNotification', ({ params }) => {
        console.log(
          `Server got BootNotification from ${client.identity}:`,
          params,
        );
        return {
          status: 'Accepted',
          interval: 300,
          currentTime: new Date().toISOString(),
        };
      });

      client.handle('Heartbeat', ({ params }) => {
        console.log(`Server got Heartbeat from ${client.identity}:`, params);
        return {
          currentTime: new Date().toISOString(),
        };
      });

      client.handle('StatusNotification', ({ params }) => {
        console.log(
          `Server got StatusNotification from ${client.identity}:`,
          params,
        );
        return {};
      });

      client.handle('Authorize', ({ params }) => {
        console.log(`Server got Authorize from ${client.identity}:`, params);
        return {
          idTagInfo: {
            status: 'Accepted',
          },
        };
      });

      client.handle('StartTransaction', ({ params }) => {
        console.log(
          `Server got StartTransaction from ${client.identity}:`,
          params,
        );
        return {
          transactionId: 123456789,
          idTagInfo: {
            status: 'Accepted',
          },
        };
      });

      client.handle('StopTransaction', ({ params }) => {
        console.log(
          `Server got StopTransaction from ${client.identity}:`,
          params,
        );
        return {
          idTagInfo: {
            status: 'Accepted',
          },
        };
      });

      client.handle('MeterValues', ({ params }) => {
        console.log(`Server got MeterValues from ${client.identity}:`, params);
        return {
          // meterValues: 'Meter values received successfully',
        };
      });

      client.handle('DiagnosticsStatusNotification', ({ params }) => {
        console.log(
          `Server got DiagnosticsStatusNotification from ${client.identity}:`,
          params,
        );
        return {
          status: 'Received',
          message: 'Diagnostics status notification received successfully',
        };
      });

      client.handle('FirmwareStatusNotification', ({ params }) => {
        console.log(
          `Server got FirmwareStatusNotification from ${client.identity}:`,
          params,
        );
        return {
          status: 'Received',
          message: 'Firmware status notification received successfully',
        };
      });

      client.handle('UpdateFirmware', ({ params }) => {
        console.log(
          `Server got UpdateFirmware from ${client.identity}:`,
          params,
        );
        return {
          status: 'Success',
          message: 'Firmware updated successfully',
        };
      });

      client.handle('TriggerMessage', ({ params }) => {
        console.log(
          `Server got TriggerMessage from ${client.identity}:`,
          params,
        );
        return {
          status: 'Received',
          message: 'Trigger message received successfully',
        };
      });

      client.handle('Reset', ({ params }) => {
        console.log(`Server got Reset from ${client.identity}:`, params);
        return {
          status: 'Success',
          message: 'Reset command received successfully',
        };
      });

      client.handle('GetConfiguration', ({ params }) => {
        console.log(
          `Server got GetConfiguration from ${client.identity}:`,
          params,
        );
        return {
          configuration: 'Configuration data',
        };
      });

      client.handle('ChangeConfiguration', ({ params }) => {
        console.log(
          `Server got ChangeConfiguration from ${client.identity}:`,
          params,
        );
        return {
          status: 'Success',
          message: 'Configuration changed successfully',
        };
      });

      client.handle('ChangeAvailability', ({ params }) => {
        console.log(
          `Server got ChangeAvailability from ${client.identity}:`,
          params,
        );
        return {
          status: 'Success',
          message: 'Availability changed successfully',
        };
      });

      client.handle(
        'RemoteStartTransaction',
        (
          params: RemoteStartTransactionPayload,
        ): RemoteStartTransactionResponse => {
          console.log(
            `Server got RemoteStartTransaction from ${client.identity}:`,
            params,
          );
          return {
            status: 'Accepted',
          };
        },
      );

      client.handle('ExtendedTriggerMessage', ({ params }) => {
        console.log(
          `Server got ExtendedTriggerMessage from ${client.identity}:`,
          params,
        );
        return {
          status: 'Received',
          message: 'Extended trigger message received successfully',
        };
      });

      client.handle(({ method, params }) => {
        console.log(`Server got ${method} from ${client.identity}:`, params);
        throw createRPCError('NotImplemented');
      });

      client.on('disconnect', () => {
        console.log(`${client.session.sessionId} disconnected!`);
        this.clients.delete(client.session.sessionId);
      });
    });

    await this.server.listen(Number(process.env.WS_PORT));
    console.info('OCPP started');
  }

  async startRemoteTransaction(clientId: string) {
    const client = this.clients.get(clientId);

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    client.call('StatusNotification', {
      connectorId: 1,
      errorCode: 'NoError',
      status: 'Preparing',
    });
    return {
      message: 'ok',
    };
  }
}
